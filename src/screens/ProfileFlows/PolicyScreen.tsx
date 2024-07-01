import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { Header } from '@/components';
import { SafeAreaView } from 'react-native';

const PolicyScreen = () => {
  return (
    <>
      <Header headerTitle='Chính sách và bảo mật' />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Điều khoản sử dụng</Text>
          <Text style={styles.paragraph}>Vui lòng đọc kỹ (Điều khoản sử dụng) trước khi bạn tiến hành sử dụng liên quan đến BHEP chúng tôi.</Text>

          <Text style={styles.subTitle}>Thỏa thuận sử dụng dịch vụ</Text>
          <Text style={styles.paragraph}>
            BHEP cung cấp dịch vụ sức khỏe thông qua việc theo dõi, phân tích và đưa ra cảnh báo đến người dùng. Người muốn tham gia Thỏa thuận này nhằm mục đích truy cập và sử dụng Ứng dụng cũng như các dịch vụ bên BHEP. Bạn phải đồng ý với các Điều khoản sử dụng dịch vụ dưới đây. Các Điều khoản này do Công ty cổ phần RAPTOR đưa ra để điều chỉnh và áp dụng cho việc bạn truy cập và sử dụng website và ứng dụng BHEP của Công ty RAPTOR.
          </Text>

          <Text style={styles.subTitle}>Tài khoản của người dùng</Text>
          <Text style={styles.paragraph}>
            Để sử dụng Ứng dụng bạn phải tạo một tài khoản theo yêu cầu của BHEP. Bạn cam kết rằng việc sử dụng tài khoản phải tuân thủ các quy định của BHEP; đồng thời tất cả các thông tin bạn cung cấp cho chúng tôi là đúng, chính xác, đầy đủ tại thời điểm được yêu cầu. Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông tin tài khoản bạn đã đăng ký. Nếu có bất kỳ thông tin sai lệch nào BHEP sẽ không chịu trách nhiệm trong trường hợp thông tin đó làm ảnh hưởng hoặc hạn chế quyền lợi của bạn.
          </Text>

          <Text style={styles.subTitle}>Hành vi nghiêm cấm</Text>
          <Text style={styles.paragraph}>
            Bạn có quyền sử dụng Ứng dụng và các dịch vụ khác mà BHEP cung cấp. Tuy nhiên, việc sử dụng đó sẽ không bao gồm các hành vi sau đây:
          </Text>
          <Text style={styles.listItem}>- Sao chép, chỉnh sửa, tái tạo, tạo ra sản phẩm mới hoặc phiên bản tái sinh trên cơ sở ứng dụng này.</Text>
          <Text style={styles.listItem}>- Bán, chuyển giao, cấp quyền lại, tiết lộ hoặc hình thức chuyển giao khác hay đưa một phần hoặc toàn bộ Ứng dụng cho bên thứ ba bất kỳ.</Text>
          <Text style={styles.listItem}>- Sử dụng Ứng dụng để cung cấp dịch vụ cho bên thứ ba bất kỳ (tổ chức, cá nhân).</Text>
          <Text style={styles.listItem}>- Thiết kế lại, biên dịch, tháo gỡ, chỉnh sửa, đảo lộn thiết kế của Ứng dụng hoặc nội dung Ứng dụng.</Text>
          <Text style={styles.listItem}>- Sử dụng Ứng dụng để thực hiện bất kỳ hành động gây hại cho hệ thống an ninh mạng của BHEP, bao gồm không giới hạn sử dụng dữ liệu hoặc truy cập vào máy chủ hệ thống hoặc tài khoản không được phép; truy cập vào hệ thống mạng để xoá bỏ, chỉnh sửa và thêm các thông tin; phát tán các chương trình độc hại, virus hoặc thực hiện bất kỳ hành động nào khác nhằm gây hại hoặc phá huỷ hệ thống mạng.</Text>
          <Text style={styles.listItem}>- Đăng nhập và sử dụng Ứng dụng bằng một phần mềm tương thích của bên thứ ba hoặc hệ thống không được phát triển, cấp quyền hoặc chấp thuận bởi BHEP.</Text>
          <Text style={styles.listItem}>- Sử dụng Ứng dụng để đăng tải, chuyển, truyền hoặc lưu trữ các thông tin vi phạm pháp luật, vi phạm thuần phong mỹ tục của dân tộc.</Text>
          <Text style={styles.listItem}>- Các hành vi kích động bạo lực, phân biệt chủng tộc, giới tính, sở thích tình dục hoặc khuyết tật thể chất.</Text>
          <Text style={styles.listItem}>- Tiết lộ bất kỳ thông tin cá nhân của người khác, bao gồm địa chỉ, số điện thoại, e-mail, số thẻ tín dụng hoặc bất kỳ thông tin nào có thể được sử dụng để theo dõi, liên lạc hoặc mạo danh cá nhân đó.</Text>
          <Text style={styles.listItem}>- Cố gắng để mạo danh bất kỳ bên nào khác.</Text>
          <Text style={styles.listItem}>- Tạo tài khoản người dùng bằng các phương tiện tự động hoặc không được sự cho phép gây nhầm lẫn cho người khác về nguồn gốc thông tin liên lạc của bạn.</Text>
          <Text style={styles.listItem}>- Lừa gạt BHEP hoặc người dùng khác, đặc biệt là trong nỗ lực để tìm hiểu thông tin tài khoản nhạy cảm như mật khẩu.</Text>
          <Text style={styles.listItem}>- Sử dụng Ứng dụng để sử dụng, đăng tải, chuyển, truyền hoặc lưu trữ bất kỳ nội dung vi phạm quyền sở hữu trí tuệ, bí mật kinh doanh hoặc quyền pháp lý của bên thứ ba.</Text>
          <Text style={styles.listItem}>- Sử dụng Ứng dụng hoặc các dịch vụ khác được cung cấp bởi BHEP trong bất kỳ hình thức vi phạm pháp luật nào, cho bất kỳ mục đích bất hợp pháp nào.</Text>
          <Text style={styles.listItem}>- Các hình thức vi phạm khác.</Text>
          <Text style={styles.paragraph}>Các hành vi trên chỉ được phép thực hiện khi có sự đồng ý bằng văn bản của BHEP.</Text>

          <Text style={styles.subTitle}>Quyền truy cập và thu thập thông tin</Text>
          <Text style={styles.paragraph}>
            A. Khi sử dụng Ứng dụng, người dùng thừa nhận rằng chúng tôi có quyền sử dụng những API hệ thống sau để truy cập vào dữ liệu trên điện thoại của người dùng đó:
          </Text>
          <Text style={styles.listItem}>- Đọc và ghi vào danh bạ điện thoại.</Text>
          <Text style={styles.listItem}>- Lấy vị trí hiện tại của người dùng khi được sự đồng ý của chính chủ.</Text>
          <Text style={styles.listItem}>- Ghi dữ liệu của Ứng dụng lên thẻ nhớ.</Text>
          <Text style={styles.listItem}>- Truy cập vào Internet từ thiết bị của người dùng.</Text>
          <Text style={styles.listItem}>- Thu thập chỉ số sức khỏe người dùng thông qua thiết bị đo của chúng tôi.</Text>
          <Text style={styles.paragraph}>Tất cả các truy cập này đều được BHEP thực hiện sau khi có sự đồng ý của chính người dùng. Vì vậy người dùng cam kết và thừa nhận rằng, khi họ đã cấp quyền cho BHEP, người dùng sẽ không có bất kỳ khiếu nại nào với BHEP về việc truy cập này.</Text>
          <Text style={styles.paragraph}>
            B. Cùng với quyền truy cập, BHEP sẽ thu thập các thông tin sau của người dùng:
          </Text>
          <Text style={styles.listItem}>- Thông tin cá nhân: bao gồm các thông tin người dùng cung cấp cho BHEP để xác nhận tài khoản như tên, số điện thoại, số chứng minh nhân dân, địa chỉ, email.</Text>
          <Text style={styles.listItem}>- Thông tin chung: như các thông tin về cấu hình điện thoại của người dùng, thông tin phiên bản BHEP mà người dùng đang sử dụng cho điện thoại của mình.</Text>
          <Text style={styles.listItem}>- Thông tin vị trí: dữ liệu về vị trí địa lý của người dùng sẽ được lưu trữ trên máy chủ nhằm giúp người dùng sử dụng chức năng tìm kiếm bác sĩ của Ứng dụng.</Text>
          <Text style={styles.listItem}>- Danh bạ điện thoại: BHEP sẽ lưu trữ danh bạ điện thoại của người dùng trên máy chủ nhằm hỗ trợ tốt nhất cho bạn trong việc sử dụng Ứng dụng và tránh trường hợp người dùng mất dữ liệu. BHEP cam kết sẽ tôn trọng và không sử dụng danh bạ điện thoại của người dùng vì bất kỳ mục đích nào nếu không có sự đồng ý của chính chủ.</Text>
          <Text style={styles.paragraph}>BHEP không sử dụng bất kỳ biện pháp nào để theo dõi nội dung tin nhắn, trao đổi hoặc hình thức khác nhằm theo dõi người dùng khi sử dụng Ứng dụng này.</Text>

          <Text style={styles.subTitle}>Cam kết bảo mật thông tin</Text>
          <Text style={styles.paragraph}>BHEP cam kết giữ bí mật tất cả thông tin mà người dùng cung cấp cho BHEP hoặc chúng tôi thu thập. Chúng tôi không cho phép bất kỳ bên thứ ba nào tiếp cận thông tin của người dùng nếu không có sự đồng ý của người dùng đó.</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666', 
  },
  listItem: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
    color: '#777', 
  },
});


export default PolicyScreen;
